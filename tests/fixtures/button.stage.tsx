import { Nullable } from "preact-prop-helpers";
import { Badge, Button, ButtonFills, ButtonSizes, ButtonThemes, DefaultDisabledType } from "../../dist/index.js";
import { TestItem, fromStringBoolean, fromStringString, useTestSyncState } from "../util.js";

export interface ButtonConstants {
    onPress(pressed: boolean | null): (void | Promise<void>);
    setDisabled(disabled: boolean): void;
    setDisabledType(type: "soft" | "hard"): void;
    setBadge(badge: Nullable<string>): void;
    setPressed(pressed: Nullable<boolean>): void;
    setFill(fill: Nullable<ButtonFills>): void;
    setSize(size: Nullable<ButtonSizes>): void;
    setTheme(theme: Nullable<ButtonThemes>): void;
}

export function TestBasesButton() {
    const [disabledType] = useTestSyncState("Button", "setDisabledType", "soft", fromStringString);
    const [disabled] = useTestSyncState("Button", "setDisabled", false, fromStringBoolean);
    const [badge] = useTestSyncState("Button", "setBadge", undefined, fromStringString);
    const [pressed] = useTestSyncState("Button", "setPressed", undefined, fromStringBoolean);
    const [fill] = useTestSyncState("Button", "setFill", undefined, fromStringString);
    const [size] = useTestSyncState("Button", "setSize", undefined, fromStringString);
    const [theme] = useTestSyncState("Button", "setTheme", undefined, fromStringString);
    return (
        <TestItem>
            <DefaultDisabledType.Provider value={disabledType}>
                <Button
                    disabled={disabled}
                    badge={badge == null ? undefined : <Badge>{badge}</Badge>}
                    pressed={pressed || false}
                    variantSize={size}
                    variantFill={fill}
                    variantTheme={theme}

                    onPress={(pressed, event) => { return getTestingHandler("Button", "onPress")?.(pressed) }}
                >Async Button 2</Button>
                <input type="text" value="I can take focus" />
            </DefaultDisabledType.Provider>
        </TestItem>
    )
}