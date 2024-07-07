import { Form } from 'react-bootstrap';
import { type FC } from 'react';

interface Props {
  type: 'from' | 'to';
  loading?: boolean;
  onChange?: (value: string) => void;
  value: string;
  readOnly?: boolean;
  ref?: React.RefObject<HTMLTextAreaElement>;
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
      onChange={type === 'from' ? handleChangeTextArea : undefined}
      disabled={type === 'to' && loading}
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
