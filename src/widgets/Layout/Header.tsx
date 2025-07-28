export const Header = () => {
    return (
        <header className="flex w-screen min-w-full bg-secondary py-vertical">
            <div className="flex justify-center items-center mx-horizontal">
                <img src={`${import.meta.env.BASE_URL}/logo.svg`} alt="logo" width="35"/>
                <span className="text-gh font-bold text-primary uppercase ml-3.5">Формовочный цех</span>
            </div>
        </header>

    );
};