import { ComponentChildren, Ref, UseTypeaheadNavigationReturnTypeSelf, VNode } from "preact-prop-helpers";
type Test = `keyboard-assist-lr_${boolean}-ud_${boolean}-pg_${boolean}-he_${boolean}-tp_${boolean}`;
declare module 'preact-prop-helpers' {
    interface PersistentStates extends Record<Test, boolean> {
        "keyboard-assist-hidden-any": boolean;
    }
}
export interface KeyboardAssistIconProps {
    visible: boolean;
    description: string;
    leftRight: boolean;
    upDown: boolean;
    pageKeys: boolean;
    homeEnd: boolean;
    leaveF2?: boolean;
    textF10?: boolean;
    activateEnter: boolean;
    activateSpace: boolean;
    typeaheadStatus: TypeaheadStatus | null;
}
type TypeaheadStatus = UseTypeaheadNavigationReturnTypeSelf["typeaheadStatus"];
export declare const KeyboardAssistIcon: ({ description, activateEnter, activateSpace, leftRight, upDown, homeEnd, pageKeys, children, typeaheadStatus, leaveF2, textF10, ...props }: Omit<KeyboardAssistIconProps, "visible"> & {
    children?: VNode;
    typeaheadStatus: TypeaheadStatus | null;
}, ref?: Ref<any>) => import("preact-prop-helpers").JSX.Element;
export declare function KeyboardAssistProvider({ children }: {
    children?: ComponentChildren;
}): import("preact-prop-helpers").JSX.Element;
export {};
//# sourceMappingURL=keyboard-assist.d.ts.map