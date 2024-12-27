import { useState, useEffect } from 'react';
import {fetchHelloMessage} from "./services/apiUtils.ts";

function App() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchHelloMessage()
            .then((data) => setMessage(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>React Front End</h1>
            <p>{message ?? 'Loading...'}</p>
        </div>
    );
}

export default App;