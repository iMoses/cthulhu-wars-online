import { InteractiveMap } from './interactive-map';
import { styled } from '@linaria/react';

export default function Bootstrap() {
  return (
    <>
      <Title>Cthulhu Wars Online</Title>
      <InteractiveMap />
      <CardsGrid>
        <SpellCard>
          In any Doom phase in which you have 5 faction Spellbooks, receive this
          Spellbook.
          <br />
          Also receive 1 Elder Sign.
        </SpellCard>
        <SpellCard>
          <strong>Devour (Pre-Battle)</strong>: The enemy player eliminates one of
          his Monsters or Cultists in the area, his choice.
        </SpellCard>
      </CardsGrid>
    </>
  );
}

const Title = styled.h1`
  font-size: 48px;
  font-family: var(--font-abaddon);
  white-space: nowrap;
  margin-bottom: 24px;
`;

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const SpellCard = styled.div`
  flex: 0 0 480px;
  padding: 12px 16px;
  outline: 1px solid #fff;
  background-color: rgba(0, 0, 0, 0.5);

  strong {
    font-weight: bold;
  }
`;
