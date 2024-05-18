// src/Tiptap.jsx
import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import History from "@tiptap/extension-history";
import {
  GoBold,
  GoItalic,
  GoListOrdered,
  GoListUnordered,
} from "react-icons/go";
import { FaUndoAlt, FaRedoAlt } from "react-icons/fa";

import { RiUnderline } from "react-icons/ri";

// define your extension array

function Tiptap({ handleChange }) {
  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph,
      Bold,
      Italic,
      Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ps-5 my-2",
        },
      }),
      ,
      ListItem,
      History,
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ps-5 my-2",
        },
      }),
      
    ],
    editorProps: {
      attributes: {
        class: 'border-[1px] rounded-sm p-2 min-h-40',
      },
    },
    content: ``,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="border-[1px] rounded-lg py-1 px-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold")
                ? "border-[1px] p-2 rounded-lg bg-gray-300"
                : "text-black bg-transparent rounded-lg border-[1px] p-2 hover:bg-gray-300"
            }
            value="bold"
          >
            <GoBold />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic")
              ? "border-[1px] p-2 rounded-lg bg-gray-300"
                : "text-black bg-transparent rounded-lg p-2 border-[1px] hover:bg-gray-300"
            }
            value="italic"
          >
            <GoItalic />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline")
              ? "border-[1px] p-2 rounded-lg bg-gray-300"
                : "text-black bg-transparent rounded-lg border-[1px] p-2 hover:bg-gray-300"
            }
            value="underline"
          >
            <RiUnderline />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList")
              ? "border-[1px] p-2 rounded-lg bg-gray-300"
                : "text-black bg-transparent rounded-lg border-[1px] p-2 hover:bg-gray-300"
            }
            value="ordered-list"
          >
            <GoListOrdered className="text-lg" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            value="unordered-list"
            className={
              editor.isActive("bulletList")
              ? "border-[1px] p-2 rounded-lg bg-gray-300"
                : "text-black bg-transparent rounded-lg border-[1px] p-2 hover:bg-gray-300"
            }
          >
            <GoListUnordered className="text-lg" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            value="undo"
            className={
              editor.isActive("bulletList")
              ? "border-[1px] p-2 rounded-lg bg-gray-300"
                : "text-black bg-transparent rounded-lg border-[1px] p-2 hover:bg-gray-300"
            }
          >
            <FaUndoAlt />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            value="redo"
            className={
              editor.isActive("bulletList")
              ? "border-[1px] p-2 rounded-lg bg-gray-300"
                : "text-black bg-transparent rounded-lg border-[1px] p-2 hover:bg-gray-300"
            }
          >
            <FaRedoAlt />
          </button>
        </div>
      </div>
      <EditorContent
        onBlur={() => {
          handleChange(editor.getHTML());
        }}
        
        editor={editor}
      />
    </>
  );
}

export default Tiptap;
