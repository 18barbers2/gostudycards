import { Layout } from "../components/Layout/Layout.tsx";
import Card from "../components/Card.tsx";


export function Study() {
    return (
        <Layout>
            <div className='study-page'>  
                <h1>Study</h1>
                <div className="study-page-container">
                    <Card
                        id="1"
                        deckId="1"
                        template="<div>{{front}}</div>"
                        data={{ front: "What is the capital of France?" }}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default Study;