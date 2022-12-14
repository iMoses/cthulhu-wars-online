// import { DoomTracker } from './doom-tracker.jsx';
// import { InteractiveMap } from './interactive-map.jsx';
import { styled } from '@linaria/react';
import { observer } from 'mobx-react-lite';
import { PageLayout } from '@src/components/containers/page-layout';
import { Tooltip } from '@src/components/tooltip';
import { useInject } from '@src/library/hooks/use-inject';

export const RootRoute = observer(RootRouteMain);

function RootRouteMain() {
  const { storage } = useInject();
  return (
    <PageLayout>
      <Title>Cthulhu Wars Online</Title>
      <Tooltip content="Tooltip test!" safePolygon>
        <button>Reference element</button>
      </Tooltip>
      <pre>{JSON.stringify(storage.get('test'), null, 2)}</pre>
      {/*<DoomTracker />*/}
      {/*<InteractiveMap />*/}
      <CardsGrid>
        <SpellCard>
          Receive this Spellbook in the first Doom Phase.
          <br />
          Receive 1 Elder Sign.
        </SpellCard>
        <SpellCard>
          This must be the last Faction Spellbook you receive. It must be taken
          during the Doom Phase.
          <br />
          Receive 1 Elder Sign.
        </SpellCard>
        <SpellCard>Kill and/or Devour an enemy Unit in a Battle.*</SpellCard>
        <SpellCard>Kill and/or Devour 2 enemy Units in a Battle.*</SpellCard>
        <SpellCard>
          Control 3 Gates in ocean/sea Areas
          <br />
          OR
          <br />4 Gates exist in ocean/sea Areas.
        </SpellCard>
        <SpellCard>Awaken Cthulhu.</SpellCard>
        <SpellCard>
          <strong>Devour (Pre-Battle)</strong>: The enemy player eliminates one
          of his Monsters or Cultists in the area, his choice.
        </SpellCard>
      </CardsGrid>
    </PageLayout>
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
