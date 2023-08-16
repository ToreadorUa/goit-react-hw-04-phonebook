import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Button, FormContainer, Input } from './Form.styled';

export const Form = ({ contacts, addContact }) => {
  const [name, setName] = useState();
  const [number, setNumber] = useState();

  const handleChange = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'number':
        setNumber(target.value);
        break;
    }
  };
  const handleSub = e => {
    // создание нового контакта с проверкой на существование такого же
    e.preventDefault();
    if (
      contacts.some(el => el.name.toLowerCase().includes(name.toLowerCase()))
    ) {
      alert(`${this.state.name} is already exist`);
      setName('');
      setNumber('');
      return;
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      addContact(newContact);
      setName('');
      setNumber('');
    }
  };
  return (
    <form onSubmit={handleSub}>
      <FormContainer>
        <label>
          Name
          <Input
            type="text"
            name="name"
            //   pattern="^[a-z A-Z а-я А-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={name}
          />
        </label>
        <label>
          Number
          <Input
            type="tel"
            name="number"
            //   pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
          />
        </label>
        <Button type="submit">Add contact</Button>
      </FormContainer>
    </form>
  );
};
