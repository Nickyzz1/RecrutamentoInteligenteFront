
interface IFooter {
    className?: string
}

export const Footer = (className : IFooter) => {

    return (
        <div className={`${className} flex max-w-screen justify-end bg-white bottom-0 shadow h-8 items-center px-3`}>
            <h1>bla bla bla coisas de footer</h1>
        </div>
    )
}