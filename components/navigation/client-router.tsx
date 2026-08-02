import {
  forwardRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";

export const Link = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  function Link({ href = "/", onClick, target, ...props }, ref) {
    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      onClick?.(event);
      if (
        event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey || target === "_blank"
      ) return;

      const destination = new URL(href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      event.preventDefault();
      window.history.pushState({}, "", `${destination.pathname}${destination.search}${destination.hash}`);
      window.dispatchEvent(new PopStateEvent("popstate"));

      if (destination.hash) {
        const targetId = decodeURIComponent(destination.hash.slice(1));
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        });
      }
    }

    return <a ref={ref} href={href} target={target} onClick={handleClick} {...props} />;
  },
);
