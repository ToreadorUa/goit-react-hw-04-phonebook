import { useEffect, useState } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Form } from './Form/Form';
import { Container } from './Form/Form.styled';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // визиваємо один раз  при загрузці
  useEffect(() => {
    if (localStorage.contacts) {
      setContacts(JSON.parse(localStorage.contacts));
    }
  }, []);

  // визивається кожного разу при оновленні
  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  // фіксуємо значення фільтру
  const handleChange = ({ target }) => {
    setFilter(target.value);
  };

  // видалення елементу з масиву
  const handleDelete = ({ target }) => {
    setContacts(
      contacts.filter(el => !el.id.includes(target.parentElement.id))
    );
  };
  // додавання нового контакту в масив
  const addContact = user => {
    setContacts([...contacts, user]);
  };
  //перевірка наявності єлементу в масиві контактів(фільтр)
  const filterArray = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form addContact={addContact} contacts={contacts} />
      <h2>Contacts </h2>
      <Filter handleChange={handleChange} filter={filter} />
      <ContactList filterArray={filterArray} handleDelete={handleDelete} />
    </Container>
  );
};
