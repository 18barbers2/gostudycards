import Card from './Card';

interface CardPreviewProps {
    data: Record<string, string>;
    template: string;
    side: 'front' | 'back';
    onFlip: () => void;
}

export function CardPreview({ data, template, side, onFlip}: CardPreviewProps) {

    return (
        <div className='card-preview'>
            <p>
                Preview - {side === 'front' ? 'Front' : 'Back'}
            </p>
            <Card template={template} data={data}></Card>
            <button onClick={onFlip}>
                Flip Card
            </button>
        </div>
    );
}

export default CardPreview