import React, { useState } from 'react';
import { registerClient } from '../api/ClienteAPI'; // Asegúrate de crear esta función

const RegistroCliente: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [job, setJob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      name,
      lastName,
      lastName2,
      job,
      phoneNumber,
      age,
      email,
    };

    try {
      await registerClient(newClient);
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error("Error registrando cliente:", error);
      setError('Hubo un error al registrarse. Inténtalo de nuevo.');
    }
  };

  if (success) {
    return (
      <div className="container">
        <div className="box has-background-primary-light">
          <h1 className="title has-text-centered">¡Registro Exitoso!</h1>
          <p className="has-text-centered">Gracias por registrarte. Hemos recibido tu información.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="box has-background-primary-light">
        <h1 className="title has-text-centered">Registrarse</h1>
        {error && <p className="has-text-danger has-text-centered">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Apellido Paterno</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Apellido Materno</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={lastName2}
                onChange={(e) => setLastName2(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Trabajo</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Teléfono</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Edad</label>
            <div className="control">
              <input
                className="input"
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="control has-text-centered">
            <button className="button is-success" type="submit">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroCliente;
