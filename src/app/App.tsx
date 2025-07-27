import './App.css'

function App() {
    return (
        <>
            <header>
                <div className="logoWrapper">
                    <img src={`${import.meta.env.BASE_URL}/logo.svg`} alt="logo" width="35"/>
                    <span className="logoTitle">Формовочный цех</span>
                </div>
            </header>
        </>
    )
}

export default App
