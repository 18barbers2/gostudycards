import '../css/DeckDetail.css';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Layout } from '../components/Layout/Layout';
import type { CardEntry, Deck, CardTemplate } from '../types';
import { getCards, deleteCard } from '../api/cards';
import { getDeck } from '../api/decks';
import { getTemplate } from '../api/templates';

type CardStatus = 'new' | 'due' | 'learning' | 'mastered';

const STATUS_LABEL: Record<CardStatus, string> = {
    new: 'NEW',
    due: 'DUE',
    learning: 'LEARNING',
    mastered: 'MASTERED',
};

function getCardStatus(card: CardEntry): CardStatus {
    if (card.masteredAt) return 'mastered';
    if (card.reviewCount === 0) return 'new';
    if (new Date(card.nextReviewAt) <= new Date()) return 'due';
    return 'learning';
}

function formatInterval(days: number): string {
    if (days === 0) return '< 1 day';
    if (days === 1) return '1 day';
    if (days < 30) return `${days} days`;
    if (days < 365) return `${Math.round(days / 30)} mo`;
    return `${(days / 365).toFixed(1)} yr`;
}

function formatNextReview(nextReviewAt: string, reviewCount: number): string {
    if (reviewCount === 0) return 'Not yet studied';
    const diff = new Date(nextReviewAt).getTime() - Date.now();
    const days = Math.round(diff / 86_400_000);
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
}

export function DeckDetail() {
    const { deckId } = useParams<{ deckId: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    // If DeckTile passes deck data via state, use it immediately (avoids extra fetch)
    const [deck, setDeck] = useState<Deck | null>(location.state?.deck ?? null);
    const [cards, setCards] = useState<CardEntry[]>([]);
    const [template, setTemplate] = useState<CardTemplate | null>(null);
    const [selectedCard, setSelectedCard] = useState<CardEntry | null>(null);
    const [showFront, setShowFront] = useState(true);
    const [loading, setLoading] = useState(true);
    const [cardToDelete, setCardToDelete] = useState<CardEntry | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!deckId) return;
        const deckPromise = deck ? Promise.resolve(deck) : getDeck(deckId);
        Promise.all([
            deckPromise,
            getCards(deckId),
            getTemplate(deckId).catch(() => null),
        ])
            .then(([deckData, cardsData, templateData]) => {
                setDeck(deckData);
                setCards(cardsData);
                setTemplate(templateData);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [deckId]);

    const stats = useMemo(() => {
        const now = new Date();
        return {
            total: cards.length,
            due: cards.filter(c => !c.masteredAt && c.reviewCount > 0 && new Date(c.nextReviewAt) <= now).length,
            new: cards.filter(c => !c.masteredAt && c.reviewCount === 0).length,
            mastered: cards.filter(c => Boolean(c.masteredAt)).length,
        };
    }, [cards]);

    const studyCount = stats.due + stats.new;

    function handleSelectCard(card: CardEntry) {
        setSelectedCard(card);
        setShowFront(true);
    }

    function handleDeleteCard() {
        if (!cardToDelete) return;
        setDeleting(true);
        deleteCard(cardToDelete.id)
            .then(() => {
                setCards(prev => prev.filter(c => c.id !== cardToDelete.id));
                if (selectedCard?.id === cardToDelete.id) setSelectedCard(null);
                setCardToDelete(null);
            })
            .catch(err => console.error(err))
            .finally(() => setDeleting(false));
    }

    function getCardLabel(card: CardEntry): string {
        return card.data['Question'] ?? Object.values(card.data)[0] ?? '(No content)';
    }

    function getFieldOrder(): string[] {
        if (template?.fields?.length) return template.fields.map(f => f.name);
        if (selectedCard) return Object.keys(selectedCard.data);
        return [];
    }

    if (loading) {
        return (
            <Layout>
                <div className="deck-detail-page">
                    <div className="deck-detail-loading">
                        <span className="spinner" />
                    </div>
                </div>
            </Layout>
        );
    }

    if (!deck) {
        return (
            <Layout>
                <div className="deck-detail-page">
                    <p className="deck-detail-not-found">Deck not found.</p>
                </div>
            </Layout>
        );
    }

    const selectedStatus = selectedCard ? getCardStatus(selectedCard) : null;

    return (
        <Layout>
            <div className="deck-detail-page">

                {/* ── Header ─────────────────────────────────────────── */}
                <div className="deck-detail-header">
                    <button className="deck-detail-back" onClick={() => navigate('/decks')}>
                        ← Back to Decks
                    </button>

                    <h1 className="deck-detail-title">{deck.name}</h1>
                    {deck.description && (
                        <p className="deck-detail-description">{deck.description}</p>
                    )}

                    <div className="deck-stats">
                        <div className="stat-tile">
                            <span className="stat-number">{stats.total}</span>
                            <span className="stat-label">Total</span>
                        </div>
                        <div className="stat-tile stat-tile--due">
                            <span className="stat-number">{stats.due}</span>
                            <span className="stat-label">Due</span>
                        </div>
                        <div className="stat-tile stat-tile--new">
                            <span className="stat-number">{stats.new}</span>
                            <span className="stat-label">New</span>
                        </div>
                        <div className="stat-tile stat-tile--mastered">
                            <span className="stat-number">{stats.mastered}</span>
                            <span className="stat-label">Mastered</span>
                        </div>
                    </div>

                    <button
                        className="study-now-btn"
                        disabled={studyCount === 0}
                        onClick={() => navigate('/study', { state: { deckId } })}
                    >
                        <span className="study-now-icon">▶</span>
                        {studyCount > 0
                            ? `Study Now — ${studyCount} card${studyCount !== 1 ? 's' : ''} ready`
                            : 'All caught up!'}
                    </button>
                </div>

                {/* ── Body: two-column ───────────────────────────────── */}
                <div className="deck-detail-body">

                    {/* Left: scrollable card list */}
                    <div className="deck-card-list">
                        <div className="deck-card-list-header">
                            <span className="deck-card-list-title">Cards</span>
                            <div className="deck-card-list-actions">
                                <span className="deck-card-list-count">{stats.total} cards</span>
                                <button
                                    className="add-card-inline-btn"
                                    onClick={() => navigate('/add-card', { state: { deckId } })}
                                >
                                    + Add Card
                                </button>
                            </div>
                        </div>

                        {cards.length === 0 ? (
                            <div className="deck-cards-empty">
                                <p>No cards yet.</p>
                                <button
                                    className="deck-add-card-btn"
                                    onClick={() => navigate('/add-card', { state: { deckId } })}
                                >
                                    + Add your first card
                                </button>
                            </div>
                        ) : (
                            <div className="card-rows">
                                {cards.map(card => {
                                    const status = getCardStatus(card);
                                    const isSelected = selectedCard?.id === card.id;
                                    return (
                                        <div
                                            key={card.id}
                                            className={`card-row status-${status}${isSelected ? ' selected' : ''}`}
                                            onClick={() => handleSelectCard(card)}
                                        >
                                            <div className="card-row-bar" />
                                            <div className="card-row-content">
                                                <span className="card-row-front">{getCardLabel(card)}</span>
                                            </div>
                                            <span className={`card-row-badge badge-${status}`}>
                                                {STATUS_LABEL[status]}
                                            </span>
                                            <span className="card-row-chevron">›</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right: sticky detail panel */}
                    <div className="deck-card-panel">
                        {!selectedCard ? (
                            <div className="panel-empty">
                                <div className="panel-empty-icon">▤</div>
                                <p>Select a card to view its details</p>
                            </div>
                        ) : (
                            <div className="card-detail">
                                <div className="card-detail-top-row">
                                    <span className="card-detail-heading">Card Detail</span>
                                    <span className={`card-row-badge badge-${selectedStatus}`}>
                                        {selectedStatus && STATUS_LABEL[selectedStatus]}
                                    </span>
                                </div>

                                {/* Front / Back toggle */}
                                <div className="card-flip-tabs">
                                    <button
                                        className={`flip-tab${showFront ? ' active' : ''}`}
                                        onClick={() => setShowFront(true)}
                                    >
                                        Front
                                    </button>
                                    <button
                                        className={`flip-tab${!showFront ? ' active' : ''}`}
                                        onClick={() => setShowFront(false)}
                                    >
                                        Back
                                    </button>
                                </div>

                                {/* Card content preview */}
                                <div className="card-preview">
                                    <p className="card-preview-text">
                                        {showFront
                                            ? (selectedCard.data['Question'] ?? Object.values(selectedCard.data)[0] ?? '(empty)')
                                            : (selectedCard.data['Answer'] ?? Object.values(selectedCard.data)[1] ?? '(empty)')}
                                    </p>
                                    {showFront && selectedCard.data['Hint'] && (
                                        <p className="card-preview-hint">Hint: {selectedCard.data['Hint']}</p>
                                    )}
                                </div>

                                {/* All field values */}
                                <div className="card-detail-section">
                                    <span className="card-section-label">Fields</span>
                                    <div className="card-fields">
                                        {getFieldOrder().map(name => (
                                            <div key={name} className="card-field-row">
                                                <span className="card-field-name">{name}</span>
                                                <span className="card-field-value">
                                                    {selectedCard.data[name] || <em className="card-field-empty">empty</em>}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SRS stats */}
                                <div className="card-detail-section">
                                    <span className="card-section-label">Review Info</span>
                                    <div className="card-fields">
                                        <div className="card-field-row">
                                            <span className="card-field-name">Reviews</span>
                                            <span className="card-field-value">{selectedCard.reviewCount}</span>
                                        </div>
                                        <div className="card-field-row">
                                            <span className="card-field-name">Interval</span>
                                            <span className="card-field-value">{formatInterval(selectedCard.interval)}</span>
                                        </div>
                                        <div className="card-field-row">
                                            <span className="card-field-name">Next review</span>
                                            <span className="card-field-value">{formatNextReview(selectedCard.nextReviewAt, selectedCard.reviewCount)}</span>
                                        </div>
                                        <div className="card-field-row">
                                            <span className="card-field-name">Ease factor</span>
                                            <span className="card-field-value">{selectedCard.easeFactor.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="card-delete-btn"
                                    onClick={() => setCardToDelete(selectedCard)}
                                >
                                    Delete Card
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete confirmation modal */}
            {cardToDelete && createPortal(
                <>
                    <div className="modal-overlay" onClick={() => !deleting && setCardToDelete(null)} />
                    <div className="modal-dialog">
                        <h3 className="modal-title">Delete card?</h3>
                        <p className="modal-body">
                            This card will be permanently deleted and all its review history will be lost.
                        </p>
                        <div className="modal-actions">
                            <button
                                className="modal-btn modal-btn--cancel"
                                onClick={() => setCardToDelete(null)}
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="modal-btn modal-btn--danger"
                                onClick={handleDeleteCard}
                                disabled={deleting}
                            >
                                {deleting ? <span className="spinner" /> : 'Delete'}
                            </button>
                        </div>
                    </div>
                </>,
                document.body
            )}
        </Layout>
    );
}

export default DeckDetail;
