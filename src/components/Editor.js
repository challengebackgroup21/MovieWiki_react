import ReactQuill from 'react-quill';

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
  };
  return (
    <div className="content" style={{ width: '40%', margin: '0 auto' }}>
      <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
