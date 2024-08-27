import React, { useState, useEffect } from 'react';
import { getAllTransactions } from '../api/TransactionApi';
import { getAllClients } from '../api/ClienteAPI';
import { Transaction, Client } from '../types';

const TransaccionesPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [activeClientId, setActiveClientId] = useState<string | null>(null); // Estado para el cliente activo
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTransactionsAndClients = async () => {
      const transactionsData = await getAllTransactions();
      const clientsData = await getAllClients();
      if (transactionsData) setTransactions(transactionsData);
      if (clientsData) setClients(clientsData);
    };

    fetchTransactionsAndClients();
  }, []);

  const openModal = (clientId: string) => {
    setActiveClientId(clientId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveClientId(null);
  };

  return (
    <div className="container">
      <div className="box has-background-primary-light">
        <h1 className="title has-text-centered">Transacciones</h1>
        <div className="columns is-multiline">
          {clients.map(client => {
            const clientTransactions = transactions.filter(tx => tx.clientId === client.id);
            const remainingAmount = clientTransactions.reduce((acc, tx) => acc + (parseFloat(tx.amountToPay2) || 0), 0);
            const status = client.activeDB ? 'Pagado' : 'No pagado';

            return (
              <div
                key={client.id}
                className="column is-one-third"
                style={{ backgroundColor: 'lightcoral', padding: '20px', margin: '10px', cursor: 'pointer' }}
                onClick={() => openModal(client.id)}
              >
                <div className="has-text-centered"><strong>Cliente:</strong> {client.name}</div>
                <div className="has-text-centered"><strong>Status:</strong> {status}</div>
                <div className="has-text-centered"><strong>Amount to Pay2:</strong> {remainingAmount}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for showing detailed transaction data */}
      {isModalOpen && activeClientId && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Detalle de Transacciones</p>
              <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>
            <section className="modal-card-body">
              {transactions
                .filter(tx => tx.clientId === activeClientId)
                .map(transaction => (
                  <div key={transaction.id} className="box" style={{ backgroundColor: 'lavender', padding: '10px', marginTop: '10px' }}>
                    <div><strong>Course:</strong> {transaction.course?.name || 'N/A'}</div>
                    <div><strong>Cost:</strong> {transaction.cost || 'N/A'}</div>
                    <div><strong>Scholarship:</strong> {transaction.scholarship.name || 'N/A'}</div>
                    <div><strong>Promotion:</strong> {transaction.promotion || 'N/A'}%</div>
                    <div><strong>Amount to Pay:</strong> {transaction.amountToPay || 'N/A'}</div>
                    <div><strong>Payment Method:</strong> {transaction.paymentMethod || 'N/A'}</div>
                    <div><strong>Amount:</strong> {transaction.amount || 'N/A'}</div>
                    <div><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</div>
                    <div><strong>Folio:</strong> {transaction.folio || 'N/A'}</div>
                    <div><strong>One-time Payment:</strong> {transaction.oneTimePayment ? 'Yes' : 'No'}</div>
                    <div><strong>Amount to Pay2:</strong> {transaction.amountToPay2 || 'N/A'}</div>
                  </div>
                ))}
            </section>
            <footer className="modal-card-foot">
              <button className="button" onClick={closeModal}>Close</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransaccionesPage;

