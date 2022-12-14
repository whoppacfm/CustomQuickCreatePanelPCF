/* eslint-disable */

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';

import { getTheme, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { lorem } from '@fluentui/example-data';
import { ScrollablePane, IScrollablePaneStyles } from '@fluentui/react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from '@fluentui/react/lib/Sticky';


//Scrollpane
interface IScrollablePaneExampleItem {
    color: string;
    text: string;
    index: number;
}

const theme = getTheme();
const classNames = mergeStyleSets({
    wrapper: {
        height: '40vh',
        position: 'relative',
        maxHeight: 'inherit',
    },
    pane: {
        maxWidth: 400,
        border: '1px solid ' + theme.palette.neutralLight,
    },
    sticky: {
        color: theme.palette.neutralDark,
        padding: '5px 20px 5px 10px',
        fontSize: '13px',
        borderTop: '1px solid ' + theme.palette.black,
        borderBottom: '1px solid ' + theme.palette.black,
    },
    textContent: {
        padding: '15px 10px',
    },
});

const scrollablePaneStyles: Partial<IScrollablePaneStyles> = { root: classNames.pane };
const colors = ['#eaeaea', '#dadada', '#d0d0d0', '#c8c8c8', '#a6a6a6', '#c7e0f4', '#71afe5', '#eff6fc', '#deecf9'];
const items = Array.from({ length: 5 }).map((item, index) => ({
    color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
    text: lorem(200),
    index,
}));

const createContentArea = (item: IScrollablePaneExampleItem) => (
    <div
        key={item.index}
        style={{
            backgroundColor: item.color,
        }}
    >
        <Sticky stickyPosition={StickyPositionType.Both}>
            <div role="heading" aria-level={1} className={classNames.sticky}>
                Sticky Component #{item.index + 1}
            </div>
        </Sticky>
        <div className={classNames.textContent}>{item.text}</div>
    </div>
);
const contentAreas = items.map(createContentArea);

const ScrollPanelData: React.FunctionComponent = () => (
    <div className={classNames.wrapper}>
        <ScrollablePane
            scrollContainerFocus={true}
            scrollContainerAriaLabel="Sticky component example"
            styles={scrollablePaneStyles}
            >
            {...contentAreas}
        </ScrollablePane>
    </div>
);

const ScrollPanelInput: React.FunctionComponent = () => {
    const inputRows = [];
    for (let i:any = 0; i < 20; i++) {
        //inputRows.push();
        inputRows.push(<><br/>Input {i}:<br/><input key={i} style={{width:"200px"}} /><br/></>);
    }
    
    return (
        <div className={classNames.wrapper}>
            <ScrollablePane
                scrollContainerFocus={true}
                scrollContainerAriaLabel="Sticky component example"
                styles={scrollablePaneStyles}
                >
                {inputRows}
            </ScrollablePane>
        </div>
    )
};

//Panel
const buttonStyles = { root: { marginRight: 8 } };

const CustomQuickCreatePanel: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  // This panel doesn't actually save anything; the buttons are just an example of what
  // someone might want to render in a panel footer.
  const onRenderFooterContent = React.useCallback(
    () => (
      <div>
        <PrimaryButton onClick={dismissPanel} styles={buttonStyles}>
          Save
        </PrimaryButton>
        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
      </div>
    ),
    [dismissPanel],
  );

  return (
    <div>
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="Create Record"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
      >
        <ScrollPanelData />
        <br/>
        <ScrollPanelInput />
      </Panel>
    </div>
  );
};

export function Render(context:any, container:any) {

    /* ReactDOM.render is deprecated, but FluentUI does not support new React version until now
    const root = createRoot(container);
    root.render(<div><SearchSelectControl context={context} theobj={theobj} /></div>);
    */  

    ReactDOM.render(
      <>
        <CustomQuickCreatePanel />
      </>
      , container
    );
}
