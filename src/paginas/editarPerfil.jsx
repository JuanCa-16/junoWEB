import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import avatar1 from '../imagenes/ava1.png';
import Select from 'react-select';
import '../estilos/editarPerfil.scss';


const EditarPerfil = () => {
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({}); // Estado para los valores iniciales
    const [isDirty, setIsDirty] = useState(false); // Estado para verificar cambios

    const [usuario, setUsuario] = useState({
        nombre_real: 'defecto',
        apellidos: '',
        nombre_usuario: '',
        fecha_nacimiento: '',
        correo_electronico: '',
        telefono: '',
        sexo: '',
        ciudad: '',
    });

    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Inicia la carga
            try {
                // Traer el id del usuario que está logueado
                const response = await fetch('http://localhost:5000/usuarios/estalogin', {
                    method: 'GET',
                    headers: { token: localStorage.getItem('token') }
                });

                const info = await response.json();
                if (response.status !== 200) {
                    console.log('No se pudo obtener los datos del usuario');
                    return; // Salir si hay un error
                }

                const userEmail = info.correo; // Guardar el email

                // Traer todo del usuario que está logueado
                const res = await fetch(`http://localhost:5000/usuarios/${userEmail}`, {
                    method: 'GET',
                    headers: { 'Content-Type': "application/json" }
                });

                const data = await res.json();

                if(data){
                    console.log(data);
                    
                    // Convierte la fecha de nacimiento a 'YYYY-MM-DD'
                    const fechaNacimiento = new Date(data.fecha_nacimiento).toISOString().split('T')[0];
                
                    setUsuario({
                        nombre_real: data.nombre_real,
                        apellidos: data.apellidos,
                        nombre_usuario: data.nombre_usuario,
                        fecha_nacimiento: fechaNacimiento, // Asegúrate de que solo tenga la fecha
                        correo_electronico: data.correo_electronico,
                        telefono: data.telefono,
                        sexo: data.sexo,
                        ciudad: data.ciudad,
                    });
                    setInitialValues(usuario); // Guardar valores iniciales
                }

            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchData();
    }, []); // Solo se ejecuta una vez al montar el componente

    const genderOptions = [
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Femenino', label: 'Femenino' },
    ];

    // Encuentra la opción correspondiente al género del usuario
    const selectedGender = genderOptions.find(option => option.value === usuario.sexo);

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
        setIsDirty(true); // Cambia el estado a sucio cuando hay un cambio
    };

    const handleGenderChange = (selectedOption) => {
        setUsuario({ ...usuario, sexo: selectedOption.value });
        setIsDirty(true); // Cambia el estado a sucio cuando hay un cambio
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Formatear los nombres antes de enviarlos
        usuario.nombre_real = formatName(usuario.nombre_real);
        usuario.apellidos = formatName(usuario.apellidos);
    
        // Traer el id del usuario que está logueado
        const response = await fetch('http://localhost:5000/usuarios/estalogin', {
            method: 'GET',
            headers: { token: localStorage.getItem('token') }
        });
    
        const info = await response.json();
        if (response.status !== 200) {
            console.log('No se pudo obtener los datos del usuario');
            toast.error('No se pudo obtener los datos del usuario.'); // Muestra un mensaje de error
            return; // Salir si hay un error
        }
    
        const userEmail = info.correo; // Guardar el email
    
        // Petición para actualizar
        const res = await fetch(`http://localhost:5000/usuarios/${userEmail}`, {
            method: 'PUT',
            body: JSON.stringify(usuario), // Para que lo detecte como string
            headers: { 'Content-Type': "application/json" } // Para que rellene los campos
        });
    
        // Manejar la respuesta de actualización
        if (res.ok) {
            const data = await res.json();
    
            // Se elimina el token antiguo, se agrega el nuevo
            localStorage.removeItem("token");
            localStorage.setItem("token", data.llave);
            toast.success(data.message);
            
            // Redirigir al perfil
            setTimeout(() => {
                navigate('/perfil');
            }, 500);
        } else {
            const data = await res.json(); // Obtener datos del error
            console.log(data.message);
            toast.error(data.error || 'Error al actualizar los datos.'); // Muestra un mensaje de error
        }
    };
    

    const [clave, setClave] = useState({
        contraseña: '',
    });

    const handleChange2 = (e) => {
        setClave({ ...clave, [e.target.name]: e.target.value });
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
         // Traer el id del usuario que está logueado
        const response = await fetch('http://localhost:5000/usuarios/estalogin', {
            method: 'GET',
            headers: { token: localStorage.getItem('token') }
        });

        const info = await response.json();
        if (response.status !== 200) {
            console.log('No se pudo obtener los datos del usuario');
            return; // Salir si hay un error
        }

        const userEmail = info.correo; // Guardar el email

        //Peticion para actulizar
        const res = await fetch(`http://localhost:5000/usuarios/clave/${userEmail}`, {
            method: 'PUT',
            body: JSON.stringify(clave), //Para que lo detecte como string
            headers: { 'Content-Type': "application/json" } // Para que rellene los campos
        });

        const data = await res.json()

        //Se elimina el token antiguo, se agrega el nuevo
        if (data.llave) {
            localStorage.removeItem("token")
            localStorage.setItem("token", data.llave);
            toast.success(data.message);
            setTimeout(() => {
                navigate('/perfil');
            }, 500);
        } else {
            console.log(data.message);
            toast.error(data.error);
        }
    };

    const formatName = (name) => {
        return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    // Aquí defines los estilos personalizados para el Select
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'var(--c3)', // Color de fondo del select
            border: 'none', // Sin borde
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
            {loading ? (
                <p>Cargando...</p>
            ) : (
                
                <div className="editarPerfil">
                    <Toaster position="top-right" />
                    
                    <form className='infoP' onSubmit={handleSubmit}>
                        <h1 className='txt'>Editar Informacion</h1>
                        <div className="form">
                            <div className="input-box nom">
                                <p>Nombre</p>
                                <input type='text' value={usuario.nombre_real} required name='nombre_real' onChange={handleChange} />
                            </div>
                            <div className="input-box ape">
                                <p>Apellido</p>
                                <input type='text' value={usuario.apellidos} required name='apellidos' onChange={handleChange} />
                            </div>
                            <div className="input-box usu">
                                <p>Usuario</p>
                                <input type='text' value={usuario.nombre_usuario} required name='nombre_usuario' onChange={handleChange} />
                            </div>
                            <div className='input-box fecha'>
                                <p>Fecha de Nacimiento</p>
                                <input type='date' name='fecha_nacimiento' value={usuario.fecha_nacimiento} onChange={handleChange} />
                            </div>
                            <div className="input-box mail">
                                <p>Correo</p>
                                <input type='email' value={usuario.correo_electronico} disabled name='correo_electronico' onChange={handleChange} />
                            </div>
                            <div className='input-box tel'>
                                <p>Teléfono</p>
                                <input type='text' required value={usuario.telefono} name='telefono' inputMode="numeric" pattern="\d*" onChange={handleChange} />
                            </div>
                            <div className='input-box gen'>
                                <p>Género</p>
                                <Select
                                    options={genderOptions}
                                    placeholder="Selecciona tu género"
                                    onChange={handleGenderChange}
                                    value={selectedGender} // Asignar el género seleccionado
                                    classNamePrefix="custom-select"
                                    styles={customStyles}
                                />
                            </div>
                            <div className='input-box ciu'>
                                <p>Ciudad</p>
                                <input type='text' required placeholder='Ciudad' name='ciudad' value={usuario.ciudad} onChange={handleChange} />
                            </div>
                            <div className='btn-enviar env'>
                                <button type='submit' disabled={!isDirty}>Guardar Datos</button>
                            </div>
                        </div>
                    </form>
                    <form className='infoC' onSubmit={handleSubmit2}>
                        <h1 className='txt'>Editar Clave</h1>
                        <div className="form">
                            
                            <div className='input-box clave'>
                                <p>Clave</p>
                                <input type='password' placeholder='Clave Nueva' required name='contraseña' onChange={handleChange2} />
                            </div>
                            
                            <div className='btn-enviar env'>
                                <button type='submit'>Cambiar Clave</button>
                            </div>
                        </div>
                    </form>
                    <div className="regresar">
                        <button onClick={() => navigate('/perfil')}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditarPerfil;
