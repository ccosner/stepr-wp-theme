import { link } from '@wordpress/icons';
import { ToolbarGroup, ToolbarButton, Popover, PanelBody, PanelRow, ColorPalette } from '@wordpress/components';
import { RichText, InspectorControls, BlockControls, __experimentalLinkControl as LinkControl, getColorObjectByColorValue } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { useState } from '@wordpress/element';
import { buttonStyles } from '../../inc/theme';

registerBlockType('stepr/button', {
    title: 'Button',
    category: 'custom-blocks',
    supports: {
        anchor: true
    },
    attributes: {
        text: { type: 'string' },
        linkObject: { type: 'object' },
        buttonStyle: { type: 'string', default: 'btn-primary' },
        anchor: { type: 'string' }
    },
    edit: Edit,
    save: () => null
});

function Edit(props) {
    const {
        attributes: { text, linkObject, buttonStyle, anchor },
        setAttributes,
        className
    } = props;

    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

    const currentColorValue = buttonStyles.filter((color) => {
        return color.name == buttonStyle;
    })[0].color;

    function handleColorChange(newValue) {
        if (newValue !== undefined) {
            const { name } = getColorObjectByColorValue(buttonStyles, newValue);
            setAttributes({ buttonStyle: name });
        } else {
            return;
        }
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title='Color' initialOpen={true}>
                    <PanelRow>
                        <ColorPalette disableCustomColors={true} clearable={false} colors={buttonStyles} value={currentColorValue} onChange={handleColorChange} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton isPressed={isLinkPickerVisible} onClick={() => setIsLinkPickerVisible((state) => !state)} icon={link} />
                </ToolbarGroup>
            </BlockControls>
            <RichText allowedFormats={[]} tagName='a' className={`btn ${buttonStyle} ${className}`} value={text} onChange={(newText) => setAttributes({ text: newText })} id={anchor} />
            {isLinkPickerVisible && (
                <Popover position='middle center' onFocusOutside={() => setIsLinkPickerVisible(false)}>
                    <LinkControl settings={[]} value={linkObject} onChange={(newLink) => setAttributes({ linkObject: newLink })} />
                </Popover>
            )}
        </>
    );
}
