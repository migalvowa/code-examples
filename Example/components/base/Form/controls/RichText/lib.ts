import { useMemo, useState } from "react";

import {
  ContentState,
  EditorState,
  EntityInstance,
  RawDraftContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Options, RenderConfig, stateToHTML } from "draft-js-export-html";
import { mapValues } from "lodash";

import { useChanged, useOnChange } from "@core/core/hooks";

import { RichTextEditorState } from "./types";

const defaultExportOptions: Options = {
  inlineStyles: {
    HIGHLIGHT: { element: "mark" },
  },
  entityStyleFn(entity: EntityInstance): RenderConfig | undefined {
    const entityType = entity.getType();
    if (entityType === "IMAGE") {
      const { url, width, height, alignment, type } = entity.getData();
      return {
        element: type === "video" ? "video" : "img",
        attributes: {
          src: url,
          width,
          height,
          alt: alignment,
        },
      };
    }
    return undefined;
  },
};

function fixRawState(state: RawDraftContentState) {
  state.entityMap = mapValues(state.entityMap, (entity) => {
    if (entity.type.toLowerCase() === "image") {
      // @see https://github.com/niuware/mui-rte/issues/157
      return {
        ...entity,
        data: {
          ...entity.data,
          url: entity.data.src,
          alignment: entity.data.alt,
        },
      };
    }
    return entity;
  });
  return state;
}

function getStateFromHtml(value: string) {
  const contentHTML = convertFromHTML(value);
  const state = ContentState.createFromBlockArray(
    contentHTML.contentBlocks,
    contentHTML.entityMap
  );
  return JSON.stringify(fixRawState(convertToRaw(state)));
}

export function useRichTextEditorState(initialValue = ""): RichTextEditorState {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [content, setContent] = useState<string>(initialValue);

  useOnChange(editorState, (editorState) => {
    setContent(
      stateToHTML(editorState.getCurrentContent(), defaultExportOptions)
    );
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValue = useMemo(() => getStateFromHtml(initialValue), []);

  return { defaultValue, editorContent: useChanged(content), setEditorState };
}
