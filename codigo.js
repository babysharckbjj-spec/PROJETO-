const CHAVE = "essenza_carrinho";

const produtos = {
    "Floral-Elegance": {
        nome: "Floral Elegance",
        categoria: "Feminino",
        descricao: "Fragrância floral delicada e elegante, ideal para quem gosta de uma presença suave e sofisticada.",
        preco: 129.90,
        imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85"
    },

    "Urban-Night": {
        nome: "Urban Night",
        categoria: "Masculino",
        descricao: "Fragrância intensa e marcante para momentos especiais, com uma presença moderna e elegante.",
        preco: 149.90,
        imagem: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=85"
    },

    "Golden-Essence": {
        nome: "Golden Essence",
        categoria: "Unissex",
        descricao: "Uma fragrância sofisticada e envolvente, pensada para quem gosta de deixar sua marca.",
        preco: 179.90,
        imagem: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85"
    },

    "Rose-Velvet": {
        nome: "Rose Velvet",
        categoria: "Feminino",
        descricao: "Notas florais com toque adocicado e sofisticado.",
        preco: 139.90,
        imagem: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85"
    },

    "Black-Intense": {
        nome: "Black Intense",
        categoria: "Masculino",
        descricao: "Aroma forte, elegante e perfeito para a noite.",
        preco: 159.90,
        imagem: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85"
    },

    "Pure-Essence": {
        nome: "Pure Essence",
        categoria: "Unissex",
        descricao: "Fragrância leve e moderna para todos os momentos.",
        preco: 119.90,
        imagem: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=900&q=85"
    }
};


/* PEGAR CARRINHO */

function obterCarrinho() {

    try {

        return JSON.parse(
            localStorage.getItem(CHAVE)
        ) || [];

    } catch (erro) {

        return [];

    }

}


/* SALVAR CARRINHO */

function salvarCarrinho(carrinho) {

    localStorage.setItem(
        CHAVE,
        JSON.stringify(carrinho)
    );

}


/* ATUALIZAR CONTADOR */

function atualizarContador() {

    const contador =
        document.getElementById("cartCount");

    if (!contador) {
        return;
    }

    const quantidade =
        obterCarrinho().reduce(
            (total, produto) =>
                total + Number(produto.quantidade || 1),
            0
        );

    contador.textContent = quantidade;

}


/* ADICIONAR PRODUTO AO CARRINHO */

function adicionarAoCarrinho(
    nome,
    descricao,
    preco,
    imagem
) {

    const carrinho =
        obterCarrinho();

    const produtoExistente =
        carrinho.find(
            produto => produto.nome === nome
        );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,
            descricao: descricao,
            preco: Number(preco),
            imagem: imagem,
            quantidade: 1

        });

    }

    salvarCarrinho(carrinho);

    atualizarContador();

    alert(
        nome + " foi adicionado ao carrinho!"
    );

}


/* REMOVER PRODUTO */

function removerProduto(nome) {

    const carrinho =
        obterCarrinho();

    const novoCarrinho =
        carrinho.filter(
            produto => produto.nome !== nome
        );

    salvarCarrinho(novoCarrinho);

    mostrarCarrinho();

    atualizarContador();

}


/* ALTERAR QUANTIDADE */

function alterarQuantidade(nome, valor) {

    const carrinho =
        obterCarrinho();

    const produto =
        carrinho.find(
            item => item.nome === nome
        );

    if (!produto) {
        return;
    }

    produto.quantidade += valor;

    if (produto.quantidade <= 0) {

        const novoCarrinho =
            carrinho.filter(
                item => item.nome !== nome
            );

        salvarCarrinho(novoCarrinho);

    } else {

        salvarCarrinho(carrinho);

    }

    mostrarCarrinho();

    atualizarContador();

}


/* LIMPAR CARRINHO */

function limparCarrinho() {

    localStorage.removeItem(CHAVE);

    mostrarCarrinho();

    atualizarContador();

}


/* FORMATAR PREÇO */

function dinheiro(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* MOSTRAR CARRINHO */

function mostrarCarrinho() {

    const lista =
        document.getElementById("cartList");

    if (!lista) {
        return;
    }

    const carrinho =
        obterCarrinho();

    if (carrinho.length === 0) {

        lista.innerHTML = `

            <div class="empty">

                <h2>
                    Seu carrinho está vazio
                </h2>

                <p>
                    Escolha um perfume para começar.
                </p>

                <a
                    class="btn gold"
                    href="perfumes.html"
                    style="margin-top:18px"
                >
                    Ver perfumes
                </a>

            </div>

        `;

        const subtotal =
            document.getElementById("subtotal");

        const total =
            document.getElementById("total");

        if (subtotal) {
            subtotal.textContent = dinheiro(0);
        }

        if (total) {
            total.textContent = dinheiro(0);
        }

        return;
    }


    let valorTotal = 0;


    lista.innerHTML =
        carrinho.map(produto => {

            valorTotal +=
                produto.preco *
                produto.quantidade;

            return `

                <div class="cart-item">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >

                    <div>

                        <h3>
                            ${produto.nome}
                        </h3>

                        <p>
                            ${produto.descricao}
                        </p>

                        <p>

                            Quantidade:

                            <button
                                type="button"
                                onclick="alterarQuantidade(
                                    '${produto.nome}',
                                    -1
                                )"
                            >
                                −
                            </button>

                            <strong>
                                ${produto.quantidade}
                            </strong>

                            <button
                                type="button"
                                onclick="alterarQuantidade(
                                    '${produto.nome}',
                                    1
                                )"
                            >
                                +
                            </button>

                        </p>

                        <button
                            class="remove"
                            type="button"
                            onclick="removerProduto(
                                '${produto.nome}'
                            )"
                        >
                            Remover
                        </button>

                    </div>

                    <div class="cart-price">

                        ${dinheiro(
                            produto.preco *
                            produto.quantidade
                        )}

                    </div>

                </div>

            `;

        }).join("");


    const subtotal =
        document.getElementById("subtotal");

    const total =
        document.getElementById("total");


    if (subtotal) {

        subtotal.textContent =
            dinheiro(valorTotal);

    }

    if (total) {

        total.textContent =
            dinheiro(valorTotal);

    }

}


/* MOSTRAR DETALHES DO PRODUTO */

function mostrarDetalhes() {

    const area =
        document.getElementById("detailContent");

    if (!area) {
        return;
    }

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const chave =
        parametros.get("produto")
        || "Floral-Elegance";

    const produto =
        produtos[chave]
        || produtos["Floral-Elegance"];


    area.innerHTML = `

        <div class="detail-image">

            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
            >

        </div>


        <div class="detail-info">

            <small>
                ${produto.categoria.toUpperCase()}
            </small>

            <h1>
                ${produto.nome}
            </h1>

            <div class="detail-price">
                ${dinheiro(produto.preco)}
            </div>

            <p>
                ${produto.descricao}
            </p>

            <p>
                Uma escolha especial para quem busca
                qualidade, personalidade e uma
                fragrância marcante.
            </p>

            <label for="detailQty">
                Quantidade
            </label>

            <div class="quantity">

                <button
                    type="button"
                    onclick="mudarDetalhe(-1)"
                >
                    −
                </button>

                <input
                    id="detailQty"
                    value="1"
                    min="1"
                    type="number"
                >

                <button
                    type="button"
                    onclick="mudarDetalhe(1)"
                >
                    +
                </button>

            </div>

            <button
                class="btn gold"
                type="button"
                onclick="adicionarDetalhe(
                    '${produto.nome}',
                    '${produto.descricao}',
                    ${produto.preco},
                    '${produto.imagem}'
                )"
            >
                🛒 Adicionar ao carrinho
            </button>

            <a
                href="perfumes.html"
                class="btn light"
            >
                Voltar aos perfumes
            </a>

        </div>

    `;

}


/* MUDAR QUANTIDADE NOS DETALHES */

function mudarDetalhe(valor) {

    const input =
        document.getElementById("detailQty");

    if (!input) {
        return;
    }

    input.value =
        Math.max(
            1,
            Number(input.value) + valor
        );

}


/* ADICIONAR PELA PÁGINA DE DETALHES */

function adicionarDetalhe(
    nome,
    descricao,
    preco,
    imagem
) {

    const input =
        document.getElementById("detailQty");

    const quantidade =
        Number(input.value) || 1;

    const carrinho =
        obterCarrinho();

    const existente =
        carrinho.find(
            produto => produto.nome === nome
        );


    if (existente) {

        existente.quantidade += quantidade;

    } else {

        carrinho.push({

            nome: nome,

            descricao: descricao,

            preco: Number(preco),

            imagem: imagem,

            quantidade: quantidade

        });

    }


    salvarCarrinho(carrinho);

    atualizarContador();

    alert(
        nome + " foi adicionado ao carrinho!"
    );

}


/* PESQUISA */

function configurarBusca() {

    const busca =
        document.getElementById("searchInput");

    if (!busca) {
        return;
    }


    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const termo =
        parametros.get("busca");


    if (termo) {

        busca.value = termo;

    }


    busca.addEventListener(
        "keydown",
        function(evento) {

            if (evento.key === "Enter") {

                const texto =
                    busca.value.trim();

                if (texto) {

                    window.location.href =
                        "perfumes.html?busca="
                        +
                        encodeURIComponent(texto);

                }

            }

        }
    );


    const grid =
        document.getElementById("productGrid");


    if (grid && termo) {

        const cards =
            document.querySelectorAll(
                ".product-card"
            );

        let encontrados = 0;


        cards.forEach(function(card) {

            const texto =
                card.innerText.toLowerCase();

            const mostrar =
                texto.includes(
                    termo.toLowerCase()
                );

            if (mostrar) {

                card.style.display = "";

                encontrados++;

            } else {

                card.style.display = "none";

            }

        });


        const semResultado =
            document.getElementById(
                "noResults"
            );


        if (semResultado) {

            if (encontrados === 0) {

                semResultado.style.display =
                    "block";

            } else {

                semResultado.style.display =
                    "none";

            }

        }

    }

}


/* FORMULÁRIOS */

function configurarFormularios() {


    /* PAGAMENTO */

    const checkout =
        document.getElementById(
            "checkoutForm"
        );


    if (checkout) {

        checkout.addEventListener(
            "submit",
            function(evento) {

                evento.preventDefault();


                const mensagem =
                    document.getElementById(
                        "checkoutMessage"
                    );


                if (
                    obterCarrinho().length === 0
                ) {

                    mensagem.textContent =
                        "Seu carrinho está vazio.";

                    return;

                }


                mensagem.textContent =
                    "Pedido realizado com sucesso! Obrigado por comprar na Essenza+.";


                limparCarrinho();

                checkout.reset();

            }
        );

    }


    /* CONTATO */

    const contato =
        document.getElementById(
            "contactForm"
        );


    if (contato) {

        contato.addEventListener(
            "submit",
            function(evento) {

                evento.preventDefault();


                const mensagem =
                    document.getElementById(
                        "contactMessage"
                    );


                mensagem.textContent =
                    "Mensagem enviada com sucesso!";


                contato.reset();

            }
        );

    }

}


/* INICIAR */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarContador();

        configurarBusca();

        mostrarCarrinho();

        mostrarDetalhes();

        configurarFormularios();

    }
);