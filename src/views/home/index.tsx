import axios from "axios";
import { Nav } from "./components/nav";
export function Home() {

    const getLists = axios('http://localhost:8080/lists/')
    return (
        <div>
            <Nav/>
            <h2>Home</h2>
        </div>
    );
}