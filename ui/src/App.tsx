import { useState, useEffect } from 'react';
import {SimpleApiControllerApi} from "./api";
// import {fetchHelloMessage} from "./services/apiUtils.ts";

function App() {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const api = new SimpleApiControllerApi();
        api.getMessage()
            .then((data) => setMessage(data.data))
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