import { ComponentChildren, Ref, VNode } from "preact";
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
    typeahead: boolean;
    leaveF2?: boolean;
    textF10?: boolean;
}
export declare const KeyboardAssistIcon: ({ description, leftRight, upDown, homeEnd, pageKeys, typeahead, children, typeaheadActive, leaveF2, textF10, ...props }: Omit<KeyboardAssistIconProps, "visible"> & {
    children: VNode;
    typeaheadActive: boolean;
}, ref?: Ref<any>) => import("preact").JSX.Element;
export declare function KeyboardAssistProvider({ children }: {
    children: ComponentChildren;
}): import("preact").JSX.Element;
export {};
//# sourceMappingURL=keyboard-assist.d.ts.map