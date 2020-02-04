import Link from 'next/link'

let linkStyle = {
    margin: '0.6em'
}

let links = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/cv",
        text: "CV"
    },
    {
        url: "/blog",
        text: "Blog"
    },
]

export default () => (
    <header>
        <nav>
            {links.map(link => (
                <Link href={link.url}>
                    <a style={linkStyle}>{link.text}</a>
                </Link>
            ))}
        </nav>
    </header>
)
