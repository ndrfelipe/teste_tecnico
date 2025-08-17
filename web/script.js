document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('subscription-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subscriberList = document.getElementById('subscriber-list');
    const errorMessage = document.getElementById('error-message');

    const STORAGE_KEY = 'eventSubscribers';


    const loadSubscribers = () => {
        const savedSubscribers = localStorage.getItem(STORAGE_KEY);
        return savedSubscribers ? JSON.parse(savedSubscribers) : [];
    };


    const saveSubscribers = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
    };
    
    let subscribers = loadSubscribers();

    const renderSubscribers = () => {
        subscriberList.innerHTML = '';
        
        if (subscribers.length === 0) {
            subscriberList.innerHTML = '<li>Ainda não há ninguém inscrito.</li>';
            return;
        }

        subscribers.forEach(subscriber => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${subscriber.name}</span>
                <span class="email">${subscriber.email}</span>
            `;
            subscriberList.appendChild(listItem);
        });
    };


    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        // --- VALIDAÇÃO ---
        if (name === '' || email === '') {
            errorMessage.textContent = 'Por favor, preencha todos os campos.';
            return;
        }
        if (!email.includes('@')) {
            errorMessage.textContent = 'Por favor, insira um e-mail válido.';
            return;
        }
        errorMessage.textContent = '';

        // --- LÓGICA DE ADIÇÃO ---
        const newSubscriber = {
            name: name,
            email: email
        };

        subscribers.push(newSubscriber);
        
        saveSubscribers();
        
        nameInput.value = '';
        emailInput.value = '';
        nameInput.focus();

        renderSubscribers();
    });
    
    renderSubscribers();

});