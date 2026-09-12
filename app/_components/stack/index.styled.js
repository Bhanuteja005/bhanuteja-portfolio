'use client';

import { styled } from 'styled-components';

/** Centres its children on both axes. */
export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** Fills the viewport; used as the offcanvas menu's positioning root. */
export const FixedOverlay = styled.div`
  position: fixed;
  inset: 0;
`;
