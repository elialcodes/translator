import { Form } from 'react-bootstrap';
import { type FC } from 'react';

interface Props {
  type: 'from' | 'to';
  loading?: boolean;
  onChange?: (value: string) => void;
  value: string;
  readOnly?: boolean;
}

export const TextArea: FC<Props> = ({ type, loading, onChange, value }) => {
  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  return (
    <Form.Control
      as="textarea"
      autoFocus={type === 'from'}
      placeholder={type === 'from' ? 'Enter a text' : 'Translation'}
      disabled={type === 'to' && loading}
      onChange={type !== 'to' ? handleChangeTextArea : undefined}
      style={{
        marginTop: '10px',
        height: '200px',
        width: '200px',
        resize: 'none',
      }}
      value={value}
      readOnly={type === 'to'}
    >
      {loading && <span>...Loading</span>}
    </Form.Control>
  );
};
