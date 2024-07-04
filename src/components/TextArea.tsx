import { Form } from 'react-bootstrap';
import { type FC } from 'react';

interface Props {
  type: 'from' | 'to';
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
}

export const TextArea: FC<Props> = ({ type, loading, onChange, value }) => {
  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };
  return (
    <Form.Control
      as="textarea"
      autoFocus={type === 'from' ? true : false}
      placeholder={type === 'from' ? 'Enter a text' : 'Translation'}
      style={{
        marginTop: '10px',
        height: '200px',
        width: '200px',
        resize: 'none',
      }}
      value={value}
      onChange={handleChangeTextArea}
    >
      {loading && <span>...Loading</span>}
    </Form.Control>
  );
};
