import clsx from "clsx";
import { ButtonThemes } from "../context";
import { h, Ref } from "preact";
import { useMergedProps } from "preact-prop-helpers";
import { memo } from "preact/compat";
import { forwardElementRef } from "../utility";

//export type BadgeColorVariant = Omit<ButtonThemes, "link">;

export interface BadgeProps extends Pick<h.JSX.HTMLAttributes<HTMLSpanElement>, "class" | "className" | "children" | "style"> {
    variantTheme?: ButtonThemes;
    roundedPill?: boolean;
    className?: string;
    label: string;
}

export const Badge = memo(forwardElementRef(function Badge({ variantTheme, roundedPill, label, ...props }: BadgeProps, ref: Ref<HTMLSpanElement>) {
    return <span {...useMergedProps<HTMLSpanElement>({ ref, "aria-label": label, className: clsx("badge", roundedPill && "rounded-pill", `bg-${variantTheme ?? "secondary"}`) }, props)} />
}));
