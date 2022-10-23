import { link } from "@wordpress/icons";
import { ToolbarGroup, ToolbarButton, Popover, Button } from "@wordpress/components";
import { RichText, BlockControls, __experimentalLinkControl as LinkControl } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { useState } from "@wordpress/element";

registerBlockType("stepr/custom-button", {
    title: "Custom Button",
    attributes: {
        linkText: { type: "string" },
        linkObject: { type: "object", default: { url: "" } }
    },
    edit: EditComponent,
    save: SaveComponent
});

function EditComponent(props) {
    const {
        attributes: { linkObject, linkText },
        setAttributes,
        className
    } = props;

    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

    function handleTextChange(text) {
        setAttributes({ linkText: text });
    }

    function buttonHandler() {
        setIsLinkPickerVisible(prev => !prev);
    }

    function handleLinkChange(newLink) {
        setAttributes({ linkObject: newLink });
    }

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton onClick={ buttonHandler } icon={ link } />
                </ToolbarGroup>
            </BlockControls>
            <RichText allowedFormats={ [] } tagName="a" value={ linkText } onChange={ handleTextChange } />
            { isLinkPickerVisible && (
                <Popover position="middle center" onFocusOutside={ () => setIsLinkPickerVisible(false) }>
                    <LinkControl settings={ [] } value={ linkObject } onChange={ handleLinkChange } />
                    <Button variant="primary" onClick={ () => setIsLinkPickerVisible(false) } style={ { display: "block", width: "100%" } }>
                        Confirm Link
                    </Button>
                </Popover>
            ) }
        </>
    );
}

function SaveComponent(props) {
    const {
        attributes: { linkObject, linkText },
        className
    } = props;

    return (
        <a href={ linkObject.url }>
            { linkText }
        </a>
    );
}
