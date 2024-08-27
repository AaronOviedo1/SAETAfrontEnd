import React, { useState, useEffect } from 'react';
import { getAllClients, deleteClient, updateClient } from '../api/ClienteAPI';
import { Client } from '../types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

interface Props {}

const ClientesPage: React.FC<Props> = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editLastName2, setEditLastName2] = useState('');
  const [editJob, setEditJob] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editAge, setEditAge] = useState<number | undefined>(undefined);
  const [editEmail, setEditEmail] = useState('');
  const [editScholarship, setEditScholarship] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      const clientsData = await getAllClients();
      if (clientsData) {
        setClients(clientsData);
      }
    };
    fetchClients();
  }, []);

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      setClients(clients.filter(client => client.id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setEditName(client.name);
    setEditLastName(client.lastName);
    setEditLastName2(client.lastName2);
    setEditJob(client.job);
    setEditPhoneNumber(client.phoneNumber);
    setEditAge(client.age);
    setEditEmail(client.email);
    setEditScholarship(client.scholarship);
    setIsEditModalOpen(true);
  };

  const handleSaveEditClient = async () => {
    if (selectedClient) {
      const updatedClient = {
        name: editName,
        lastName: editLastName,
        lastName2: editLastName2,
        job: editJob,
        phoneNumber: editPhoneNumber,
        age: editAge,
        email: editEmail,
        scholarship: editScholarship,
      };
      const result = await updateClient(selectedClient.id, updatedClient);
      if (result) {
        setClients(clients.map(client =>
          client.id === selectedClient.id ? result : client
        ));
        setIsEditModalOpen(false);
        setSelectedClient(null);
      }
    }
  };

  return (
    <div className="container">
      <div className="box has-background-primary-light">
        <div className="has-text-centered">
          <span className="tag is-success is-large">CLIENTES</span>
        </div>
        <table className="table is-fullwidth is-bordered is-striped mt-4">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>APELLIDO PATERNO</th>
              <th>APELLIDO MATERNO</th>
              <th>TRABAJO</th>
              <th>TELEFONO</th>
              <th>EDAD</th>
              <th>EMAIL</th>
              <th>BECA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.lastName}</td>
                <td>{client.lastName2}</td>
                <td>{client.job}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.age}</td>
                <td>{client.email}</td>
                <td>{client.scholarship}</td>
                <td>
                  <button
                    className="button is-small is-info"
                    onClick={() => handleEditClient(client)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="button is-small is-danger ml-2"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Editar Cliente</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setIsEditModalOpen(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Apellido Paterno</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Apellido Materno</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={editLastName2}
                    onChange={(e) => setEditLastName2(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Trabajo</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={editJob}
                    onChange={(e) => setEditJob(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Teléfono</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={editPhoneNumber}
                    onChange={(e) => setEditPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Edad</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="field">
                  <label className="label">Beca</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='scholarship'
                      value={editScholarship}
                      onChange={(e) => setEditScholarship(e.target.value)}
                      />
                  </div>
              </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleSaveEditClient}>
                Guardar Cambios
              </button>
              <button className="button" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesPage;
