document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    const likesCountSpan = likeBtn ? likeBtn.querySelector(".like-count") : null;
    const likeSvg = likeBtn ? likeBtn.querySelector("svg") : null;
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");

    if (!likeBtn) return;

    // Estados iniciais
    let baseLikes = 0; // Começa a partir de 0
    let isLiked = false;

    // Atualiza o texto visual do contador no início
    if (likesCountSpan) {
        likesCountSpan.textContent = formatLikes(baseLikes);
    }

    // Formata números para o padrão 1K, 2K, etc.
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Animação visual no coração
    function animateHeart() {
        if (likeSvg) {
            likeSvg.style.transform = "scale(1.3)";
            setTimeout(() => {
                likeSvg.style.transform = "scale(1)";
            }, 150);
        }
    }

    // Função para adicionar uma curtida
    function addLike() {
        if (!isLiked) {
            baseLikes++;
            isLiked = true;
            likeBtn.classList.add("liked");
            if (likesCountSpan) {
                likesCountSpan.textContent = formatLikes(baseLikes);
            }
            animateHeart();
        }
    }

    // Função para remover uma curtida
    function removeLike() {
        if (isLiked) {
            isLiked = false;
            baseLikes = Math.max(0, baseLikes - 1);
            likeBtn.classList.remove("liked");
            if (likesCountSpan) {
                likesCountSpan.textContent = formatLikes(baseLikes);
            }
            animateHeart();
        }
    }

    // Evento no BOTÃO DE CORAÇÃO (Alterna entre curtir e descurtir)
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isLiked) {
            removeLike();
        } else {
            addLike();
        }
    });

    // Evento de clique na IMAGEM PRINCIPAL (Sempre curte)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Evento no botão de SALVAR (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svg = bookmarkBtn.querySelector("svg");
            if (svg) {
                svg.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svg.style.transform = "scale(1)";
                }, 150);
            }
        });
    }
});