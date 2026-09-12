#!/usr/bin/env python3
"""Refresh case-studies.json from the reference project pages.

Reads the project list (slug, href, fallback colour) out of
reference-work-data.js via Node, scrapes each project page for its hero and
device media, and writes the result to case-studies.json.

Usage:
    python scripts/import-reference-cases.py

Requires Node on PATH. The scraped pages belong to a third party; this only
refreshes data that is already checked in, it is not part of the app build.
"""

from __future__ import annotations

import concurrent.futures
import json
import re
import subprocess
import sys
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin

ROOT = Path(__file__).resolve().parents[1]
DATA_MODULE = ROOT / 'reference-work-data.js'
OUTPUT = ROOT / 'case-studies.json'

REQUEST_TIMEOUT = 40
MAX_WORKERS = 4
USER_AGENT = 'Mozilla/5.0'

# Tags the HTML parser must not push onto its open-element stack.
VOID_TAGS = frozenset(
    'img input br hr meta link source wbr area embed'.split()
)


class Node:
    """A minimal element node: tag, attributes, children and text."""

    def __init__(self, tag: str = '', attrs=None):
        self.tag = tag
        self.attrs = dict(attrs or [])
        self.children: list['Node'] = []
        self.text = ''

    def has_class(self, name: str) -> bool:
        return name in self.attrs.get('class', '').split()

    def find_all(self, predicate) -> list['Node']:
        """Every descendant matching `predicate`, parents before children."""
        matches = [c for c in self.children if predicate(c)]
        for child in self.children:
            matches.extend(child.find_all(predicate))
        return matches

    def find(self, predicate) -> 'Node':
        """The first matching descendant, or an empty node if there is none."""
        matches = self.find_all(predicate)
        return matches[0] if matches else Node()

    def text_content(self) -> str:
        parts = [self.text] + [c.text_content() for c in self.children]
        return re.sub(r'\s+', ' ', ' '.join(parts)).strip()


class DocumentTree(HTMLParser):
    """Builds a Node tree from an HTML document."""

    def __init__(self):
        super().__init__()
        self.root = Node()
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        self.stack[-1].text += data


def load_projects() -> list[dict]:
    """Read `referenceWorks` out of the JS module, using Node as the parser."""
    script = (
        'import("file://" + process.argv[1])'
        '.then(m => console.log(JSON.stringify(m.referenceWorks)))'
    )
    result = subprocess.run(
        ['node', '--input-type=module', '-e', script, str(DATA_MODULE)],
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(result.stdout)


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
    with urllib.request.urlopen(request, timeout=REQUEST_TIMEOUT) as response:
        return response.read().decode()


def collect_media(node: Node, base_url: str) -> list[dict]:
    """Every image/video under `node`, de-duplicated and absolutised."""
    found = []
    for element in node.find_all(
        lambda e: e.tag in ('img', 'video') or 'data-bg' in e.attrs
    ):
        src = (
            element.attrs.get('data-src')
            or element.attrs.get('src')
            or element.attrs.get('data-bg')
        )
        if not src and element.tag == 'video':
            src = element.find(lambda e: e.tag == 'source').attrs.get('src')
        if not src or src.startswith('data:'):
            continue
        found.append(
            {
                'type': 'video' if element.tag == 'video' else 'image',
                'src': urljoin(base_url, src),
            }
        )

    return list({item['src']: item for item in found}.values())


def frame_url(group: Node, base_url: str) -> str | None:
    """The device frame image a group is overlaid on, if it has one."""
    style = group.find(lambda e: e.has_class('overlay-device')).attrs.get(
        'style', ''
    )
    match = re.search(r"url\(['\"]?([^)'\"]+)", style)
    return urljoin(base_url, match.group(1)) if match else None


def collect_blocks(tree: Node, base_url: str, fallback_color: str) -> list[dict]:
    blocks = []
    for section in tree.find_all(
        lambda e: e.tag == 'section' and e.has_class('single-block')
    ):
        groups = section.find_all(lambda e: e.has_class('device')) or [section]

        items = []
        for group in groups:
            media = collect_media(group, base_url)
            if media:
                items.append(
                    {'media': media, 'frame': frame_url(group, base_url)}
                )
        if not items:
            continue

        color = re.search(
            r'background-color:\s*([^;]+)', section.attrs.get('style', '')
        )
        blocks.append(
            {
                'className': section.attrs.get('class', ''),
                'color': color.group(1) if color else fallback_color,
                'groups': items,
            }
        )

    return blocks


def scrape(project: dict) -> tuple[str, dict]:
    url = project['href']
    tree = DocumentTree()
    tree.feed(fetch(url))

    hero = tree.root.find(lambda e: e.has_class('case-intro-image'))
    live = hero.find(
        lambda e: e.tag == 'a' and e.attrs.get('target') == '_blank'
    ).attrs.get('href')

    return project['slug'], {
        'live': live,
        'hero': collect_media(hero, url),
        'blocks': collect_blocks(tree.root, url, project['color']),
    }


def main() -> int:
    projects = load_projects()
    print(f'Scraping {len(projects)} project page(s)...')

    with concurrent.futures.ThreadPoolExecutor(MAX_WORKERS) as pool:
        cases = dict(pool.map(scrape, projects))

    OUTPUT.write_text(
        json.dumps(cases, indent=2, ensure_ascii=False) + '\n', encoding='utf8'
    )

    for slug, case in cases.items():
        print(f'  {slug}: {len(case["hero"])} hero, {len(case["blocks"])} blocks')
    print(f'Wrote {OUTPUT.relative_to(ROOT)}')

    return 0


if __name__ == '__main__':
    sys.exit(main())
