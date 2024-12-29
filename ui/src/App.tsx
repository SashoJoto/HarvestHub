import { useState, useEffect } from 'react';
import {SimpleApiControllerApi, User} from "./api";
// import {fetchHelloMessage} from "./services/apiUtils.ts";

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const api = new SimpleApiControllerApi();
        api.getMessage()
            .then((data) => setUser(data.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>React Front End</h1>
            <p>{user?.name ?? 'Loading...'}</p>
        </div>
    );
}

export default App;