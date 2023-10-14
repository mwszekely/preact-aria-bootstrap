export function usePortalId(type) {
    const fullId = `portal-${type}`;
    if (document.getElementById(fullId) == null) {
        let portalRoot = document.getElementById("portal");
        let thisRoot = document.createElement("div");
        thisRoot.id = fullId;
        portalRoot?.appendChild(thisRoot);
    }
    return fullId;
}
//# sourceMappingURL=use-portal-id.js.map