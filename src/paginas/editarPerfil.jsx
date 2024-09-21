import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../imagenes/ava1.png';
import Select from 'react-select';
import '../estilos/editarPerfil.scss';

const EditarPerfil = () => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        fecha: '',
        correo: '',
        clave: '',
        telefono: '',
        genero: '',
        ciudad: '',
    });

    const genderOptions = [
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Femenino', label: 'Femenino' },
    ];

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleGenderChange = (selectedOption) => {
        setUsuario({ ...usuario, genero: selectedOption.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(usuario);
    };

    // Aquí defines los estilos personalizados para el Select
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'var(--c3)', // Color de fondo del select
            border: 'none',               // Sin borde
            borderRadius: 'var(--border2)', // Borde redondeado
            height: '2.5rem', // Altura del input
            minHeight: '2.5rem',
            padding: '0', // Sin padding para que el contenido no se desborde
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 0.5rem', // Ajuste del padding interno
            display: 'flex',
            alignItems: 'center', // Alinear el texto verticalmente
        }),
        indicatorSeparator: () => ({
            display: 'none', // Opcional: eliminar la línea separadora entre el input y la flecha
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            color: 'var(--c2)',
            height: '2.5rem', // Asegura que la flecha también se ajuste a la altura
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'var(--c2)',
            padding: '0.5rem', // Asegura que la flecha no se salga
        }),
        placeholder: (provided) => ({
            ...provided,
            alignItems: 'center',
            color: 'var(--textc2)', // Color del placeholder
            paddingLeft: '.5rem', // Padding interno
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'var(--textc2)', // Color del texto seleccionado
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'var(--c2)', // Color de fondo del menú
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'var(--c4)' : 'var(--c2)', // Fondo al pasar por encima
            color: 'var(--textc2)',  // Color del texto de las opciones
        }),
    };

    return (
        <div className='conteiner-editar-perfil'>
            <div className="editarPerfil">
                <form onSubmit={handleSubmit}>
                    <h1 className='txt'>Editar Perfil</h1>
                    <div className="form">
                        <div className='imgDiv img'>
                            <p>Editar avatar:</p>
                            <img src={avatar1} alt="perfil" className='img' />
                        </div>
                        <div className="input-box nom">
                            <p>Nombre</p>
                            <input type='text' placeholder='Nombre' required name='nombre' onChange={handleChange} />
                        </div>
                        <div className="input-box ape">
                            <p>Apellido</p>
                            <input type='text' placeholder='Apellido' required name='apellido' onChange={handleChange} />
                        </div>
                        <div className='input-box fecha'>
                            <p>Fecha de Nacimiento</p>
                            <input type='date' name='fecha' onChange={handleChange} />
                        </div>
                        <div className="input-box mail">
                            <p>Correo</p>
                            <input type='email' placeholder='Correo' required name='correo' onChange={handleChange} />
                        </div>
                        <div className='input-box clave'>
                            <p>Clave</p>
                            <input type='password' placeholder='Clave Nueva' required name='clave' onChange={handleChange} />
                        </div>
                        <div className='input-box tel'>
                            <p>Teléfono</p>
                            <input type='text' required placeholder='Telefono' name='telefono' inputMode="numeric" pattern="\d*" onChange={handleChange} />
                        </div>
                        <div className='input-box gen'>
                            <p>Género</p>
                            <Select
                                options={genderOptions}
                                placeholder="Selecciona tu género"
                                onChange={handleGenderChange}
                                classNamePrefix="custom-select"
                                styles={customStyles} // Agregas los estilos aquí
                            />
                        </div>
                        <div className='input-box ciu'>
                            <p>Ciudad</p>
                            <input type='text' required placeholder='Ciudad' name='ciudad' onChange={handleChange} />
                        </div>
                        <div className='btn-enviar env'>
                            <button type='submit'>Guardar Datos</button>
                        </div>
                    </div>
                </form>
                <div className="regresar">
                    <button onClick={() => navigate('/perfil')}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditarPerfil;
