import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import powerbi from "powerbi-visuals-api";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { Main } from "./component/main.component";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

export class Visual implements IVisual {
    // A DOM node which can render react components
    private reactRoot: Root;

    /** Navigate the user to the given url. */
    public static goToUrl: (url: string) => void;

    constructor(options: VisualConstructorOptions) {
        // Initiate react
        this.reactRoot = createRoot(options.element);

        Visual.goToUrl = options.host.launchUrl;
    }

    public update(options: VisualUpdateOptions) {
        console.info("Data which was given to custom visual", options);

        // Render react component
        this.reactRoot.render(<Main height={options.viewport.height} />);
    }
}
