
export function useHtmlRouterLinks(
    containerRef: Ref<HTMLElement | null>,
    contentRef: Ref<string>
) {
    const router = useRouter();

    watch(
        [containerRef, contentRef],
        async () => {
            await nextTick(); // чекаємо, поки v-html вмонтує новий innerHTML
            const container = containerRef.value;
            if (!container) return;

            container
                .querySelectorAll<HTMLAnchorElement>('a[href^="/"]')
                .forEach((link) => {
                    if (link.dataset.routerBound) return;
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const href = link.getAttribute('href')!;
                        router.push(href);
                    });
                    link.dataset.routerBound = 'true';
                });
        },
        { immediate: true }
    );
}