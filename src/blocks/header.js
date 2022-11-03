import { registerBlockType } from "@wordpress/blocks";
import { THEME_PATH } from "../../inc/theme";

registerBlockType("stepr/header", {
    title: "Header",
    category: "custom-blocks",
    supports: {
        align: true
    },
    attributes: {
        align: { type: 'string', default: 'full' }
    },
    edit: Edit,
    save: () => null
});

function Edit() {
    return (
        <>
            <header className="site-header">
                <div className="container">
                    <img src={ `${THEME_PATH}/stepr-logo-v1.svg` } className="logo"></img>
                </div>
            </header>
        </>
    );
};