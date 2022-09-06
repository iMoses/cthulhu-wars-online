import { InteractiveMap } from './interactive-map';
import { styled } from '@linaria/react';

export default function Bootstrap() {
  return (
    <>
      <Title>Cthulhu Wars Online</Title>
      <InteractiveMap />
      <SpellCard>
        In any Doom phase in which you have 5 faction Spellbooks, receive this
        Spellbook.
        <br />
        Also receive 1 Elder Sign.
      </SpellCard>
    </>
  );
}

const Title = styled.h1`
  font-size: 48px;
  font-family: var(--font-abaddon);
  margin-bottom: 24px;
`;

const SpellCard = styled.div`
  width: 480px;
  padding: 12px 16px;
  outline: 1px solid #fff;
  background-color: rgba(0, 0, 0, 0.5);
`;
