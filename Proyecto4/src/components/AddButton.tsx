import { useState } from 'react';
import { Button } from '@radix-ui/themes';
import Modal from './Modal';
import { Task } from '../Task';

interface AddButtonProps {
  handleAdd: (newTask: Task) => void;
}

const AddButton = ({handleAdd} : AddButtonProps) => {
  const [show, setShow] = useState(false);

  const submit = (task: Task) => {
    handleAdd(task);
    hideModal();
  }
  
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  return (
    <div>
      <Button onClick={showModal} className='addbutton'>New</Button>
      <Modal show={show} hideModal={hideModal} onSubmit={submit} />
    </div>
  );
};

export default AddButton;
