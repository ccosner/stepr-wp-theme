import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";

registerBlockType("stepr/button-group", {
    title: "Button Group",
    category: "custom-blocks",
    edit: Edit,
    save: () => <InnerBlocks.Content />
});

function Edit() {
    const TEMPLATE = [
        ['stepr/button', {}]
    ];

    return (
        <>
            <div className="button-group editor">
                <InnerBlocks allowedBlocks={ ['stepr/button'] } template={ TEMPLATE } />
            </div>
        </>
    );
}