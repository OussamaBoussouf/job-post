// src/Tiptap.jsx
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
import Focus from "@tiptap/extension-focus";
import {
  GoBold,
  GoItalic,
  GoListOrdered,
  GoListUnordered,
} from "react-icons/go";
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
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ps-5 my-2",
        },
      }),
    ],
    content: ``,
  });

  if (!editor) {
    return null;
  }

  

  return (
    <>
      <div className="border-[1px] rounded-lg py-1 px-3">
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold")
                ? "bg-red-600"
                : "text-black bg-transparent border-[1px]"
            }
            value="bold"
          >
            <GoBold />
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic")
                ? "bg-red-600"
                : "text-black bg-transparent border-[1px]"
            }
            value="italic"
          >
            <GoItalic />
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline")
                ? "bg-red-600"
                : "text-black bg-transparent border-[1px]"
            }
            value="underline"
          >
            <RiUnderline />
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList")
                ? "bg-red-600"
                : "text-black bg-transparent border-[1px]"
            }
            value="ordered-list"
          >
            <GoListOrdered className="text-lg" />
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            value="unordered-list"
            className={
              editor.isActive("bulletList")
                ? "bg-red-600"
                : "text-black bg-transparent border-[1px]"
            }
          >
            <GoListUnordered className="text-lg" />
          </Button>
        </div>
      </div>
      <EditorContent onBlur={() => {
        handleChange(editor.getHTML());
      }}  className="p-3 border-[1px] rounded-lg" editor={editor} />
    </>
  );
}

export default Tiptap;
