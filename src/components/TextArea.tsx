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
    <textarea
      className="textarea"
      autoFocus={type === 'from'}
      placeholder={type === 'from' ? 'Enter a text' : 'Translation'}
      onChange={type === 'from' ? handleChangeTextArea : undefined}
      disabled={type === 'to' && loading}
      value={value}
      readOnly={type === 'to'}
    >
      {loading && <span>...Loading</span>}
    </textarea>
  );
};
