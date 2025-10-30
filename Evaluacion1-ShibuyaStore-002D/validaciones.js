
// ===== FUNCIONES DE VALIDACIÓN GENERALES =====
// Función para mostrar errores
function showError(field, message) {
    field.classList.add('invalid');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Función para limpiar errores
function clearError(field) {
    field.classList.remove('invalid');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Validaciones específicas
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateEmailDomain(email) {
    const validDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return validDomains.some(domain => email.includes(domain));
}

function isValidName(name) {
    const re = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]{2,50}$/;
    return re.test(name);
}

function isValidPhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{8,20}$/;
    return re.test(phone);
}

function validateRun(run) {
    // Validación básica de RUN chileno
    const runRegex = /^[0-9]{7,9}[0-9Kk]$/;
    return runRegex.test(run);
}

// ===== VALIDACIÓN DEL FORMULARIO DE CONTACTO =====
function initContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const charCount = document.getElementById('charCount');
    const messageTextarea = document.getElementById('message');
    
    if (!contactForm) return;
    
    // Contador de caracteres para el mensaje
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            const counter = this.parentElement.querySelector('.char-counter');
            if (counter) {
                if (length > 450) {
                    counter.classList.add('warning');
                    counter.classList.remove('danger');
                } else if (length > 490) {
                    counter.classList.remove('warning');
                    counter.classList.add('danger');
                } else {
                    counter.classList.remove('warning', 'danger');
                }
            }
        });
    }
    
    // Función para validar campos individuales
    function validateField(field) {
        // Limpiar error previo
        clearError(field);
        
        // Validar campo requerido
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, 'Este campo es obligatorio');
            return false;
        }
        
        // Validaciones específicas por tipo de campo
        switch(field.type) {
            case 'email':
                if (field.value && !isValidEmail(field.value)) {
                    showError(field, 'Por favor, ingresa un correo electrónico válido');
                    return false;
                }
                break;
                
            case 'tel':
                if (field.value && !isValidPhone(field.value)) {
                    showError(field, 'Por favor, ingresa un número de teléfono válido');
                    return false;
                }
                break;
                
            case 'text':
                if (field.id === 'name' && !isValidName(field.value)) {
                    showError(field, 'El nombre solo puede contener letras y espacios');
                    return false;
                }
                break;
        }
        
        // Validar longitud mínima
        if (field.hasAttribute('minlength')) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (field.value.length > 0 && field.value.length < minLength) {
                showError(field, `Mínimo ${minLength} caracteres requeridos`);
                return false;
            }
        }
        
        // Validar patrón
        if (field.hasAttribute('pattern')) {
            const pattern = new RegExp(field.getAttribute('pattern'));
            if (field.value && !pattern.test(field.value)) {
                showError(field, 'El formato no es válido');
                return false;
            }
        }
        
        return true;
    }
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Limpiar error cuando el usuario empiece a escribir
            if (this.classList.contains('invalid')) {
                clearError(this);
            }
        });
    });
    
    // Validación del formulario completo
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        let isValid = true;
        const fieldsToValidate = contactForm.querySelectorAll('input[required], textarea[required]');
        
        fieldsToValidate.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Enfocar el primer campo con error
            const firstError = contactForm.querySelector('.invalid');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Simular envío
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            contactForm.reset();
            if (charCount) charCount.textContent = '0';
            
        } catch (error) {
            alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
            console.error('Error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
    
    // Validación inicial de campos con valores pre-existentes
    const fieldsWithValues = contactForm.querySelectorAll('input, textarea');
    fieldsWithValues.forEach(field => {
        if (field.value) {
            validateField(field);
        }
    });
}

// ===== VALIDACIÓN DEL FORMULARIO DE LOGIN =====
function initLoginFormValidation() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    // Función para validar campos individuales del login
    function validateLoginField(field) {
        // Limpiar error previo
        clearError(field);
        
        // Validar campo requerido
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, 'Este campo es obligatorio');
            return false;
        }
        
        // Validaciones específicas por tipo de campo
        switch(field.type) {
            case 'email':
                if (field.value && !isValidEmail(field.value)) {
                    showError(field, 'Por favor, ingresa un correo electrónico válido');
                    return false;
                }
                // Validar dominio específico
                if (field.value && !validateEmailDomain(field.value)) {
                    showError(field, 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
                    return false;
                }
                break;
                
            case 'password':
                if (field.value && (field.value.length < 4 || field.value.length > 10)) {
                    showError(field, 'La contraseña debe tener entre 4 y 10 caracteres');
                    return false;
                }
                break;
        }
        
        return true;
    }
    
    // Agregar validación en tiempo real
    const loginInputs = loginForm.querySelectorAll('input');
    loginInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateLoginField(this);
        });
        
        input.addEventListener('input', function() {
            // Limpiar error cuando el usuario empiece a escribir
            if (this.classList.contains('invalid')) {
                clearError(this);
            }
        });
    });
    
    // Validación del formulario completo de login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        let isValid = true;
        const fieldsToValidate = loginForm.querySelectorAll('input[required]');
        
        fieldsToValidate.forEach(field => {
            if (!validateLoginField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Enfocar el primer campo con error
            const firstError = loginForm.querySelector('.invalid');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Simular envío
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Iniciando sesión...';
        
        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            alert('¡Inicio de sesión exitoso!');
            loginForm.reset();
            changePage('home');
            
        } catch (error) {
            alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
            console.error('Error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ===== VALIDACIÓN DEL FORMULARIO DE REGISTRO =====
function initRegisterFormValidation() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
    // Función para validar campos individuales del registro
    function validateRegisterField(field) {
        // Limpiar error previo
        clearError(field);
        
        // Validar campo requerido
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, 'Este campo es obligatorio');
            return false;
        }
        
        // Validaciones específicas por tipo de campo
        switch(field.type) {
            case 'text':
                if (field.id === 'register-run' && field.value && !validateRun(field.value)) {
                    showError(field, 'RUN inválido. Formato: 12345678K (sin puntos ni guión)');
                    return false;
                }
                if ((field.id === 'register-name' || field.id === 'register-lastname') && field.value && !isValidName(field.value)) {
                    showError(field, 'Este campo solo puede contener letras y espacios');
                    return false;
                }
                break;
                
            case 'email':
                if (field.value && !isValidEmail(field.value)) {
                    showError(field, 'Por favor, ingresa un correo electrónico válido');
                    return false;
                }
                // Validar dominio específico
                if (field.value && !validateEmailDomain(field.value)) {
                    showError(field, 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com');
                    return false;
                }
                break;
                
            case 'password':
                if (field.value && (field.value.length < 4 || field.value.length > 10)) {
                    showError(field, 'La contraseña debe tener entre 4 y 10 caracteres');
                    return false;
                }
                break;
        }
        
        // Validación especial para checkbox de términos
        if (field.id === 'register-terms' && !field.checked) {
            showError(field, 'Debes aceptar los términos y condiciones');
            return false;
        }
        
        return true;
    }
    
    // Función para validar que las contraseñas coincidan
    function validatePasswordMatch() {
        const password = document.getElementById('register-password');
        const confirmPassword = document.getElementById('register-confirm-password');
        
        if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Las contraseñas no coinciden');
            return false;
        } else {
            clearError(confirmPassword);
            return true;
        }
    }
    
    // Agregar validación en tiempo real
    const registerInputs = registerForm.querySelectorAll('input');
    registerInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateRegisterField(this);
        });
        
        input.addEventListener('input', function() {
            // Limpiar error cuando el usuario empiece a escribir
            if (this.classList.contains('invalid')) {
                clearError(this);
            }
            
            // Validación especial para confirmación de contraseña
            if (this.id === 'register-password' || this.id === 'register-confirm-password') {
                validatePasswordMatch();
            }
        });
    });
    
    // Validación del formulario completo de registro
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        let isValid = true;
        const fieldsToValidate = registerForm.querySelectorAll('input[required]');
        
        fieldsToValidate.forEach(field => {
            if (!validateRegisterField(field)) {
                isValid = false;
            }
        });
        
        // Validar coincidencia de contraseñas
        if (!validatePasswordMatch()) {
            isValid = false;
        }
        
        if (!isValid) {
            // Enfocar el primer campo con error
            const firstError = registerForm.querySelector('.invalid');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Simular envío
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creando cuenta...';
        
        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 2000));
        
            alert('¡Cuenta creada exitosamente!');
            registerForm.reset();
            changePage('login');
            
        } catch (error) {
            alert('Error al crear la cuenta. Por favor, intenta nuevamente.');
            console.error('Error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ===== INICIALIZACIÓN DE TODAS LAS VALIDACIONES =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar validaciones de formularios
    initContactFormValidation();
    initLoginFormValidation();
    initRegisterFormValidation();
});

// Función para cambiar de página (necesaria para la navegación)
function changePage(pageId) {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Ocultar todas las páginas
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar la página seleccionada
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Actualizar enlace activo
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}