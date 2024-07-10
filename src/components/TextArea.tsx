import { type FC, ReactNode } from 'react';

interface Props {
  type: 'from' | 'to';
  loading?: boolean;
  onChange?: (value: string) => void;
  value: string;
  readOnly?: boolean;
  ref?: React.RefObject<HTMLTextAreaElement>;
  children?: ReactNode;
}

export const TextArea: FC<Props> = ({
  type,
  loading,
  onChange,
  value,
  children,
}) => {
  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="div-textarea">
      <textarea
        className="textarea"
        autoFocus={type === 'from'}
        placeholder={type === 'from' ? 'Enter a text' : 'Translation'}
        onChange={type === 'from' ? handleChangeTextArea : undefined}
        disabled={type === 'to' && loading}
        value={value}
        readOnly={type === 'to'}
      />
      {loading && children}
    </div>
  );
};
