import { useCallback, useEffect, VFC } from "react";
import { Remirror, useRemirror } from "@remirror/react";
import { RemirrorEventListenerProps } from "remirror";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const Editor: VFC<Props> = (props) => {
  const { onChange } = props;
  const { manager, state, setState } = useRemirror({
    stringHandler: "html",
    content: `<pre><code>${props.value}</code></pre>`,
  });

  useEffect(() => {
    console.log("props value", props.value);
  }, [props.value]);

  const handleSetState = useCallback(
    (parameter: RemirrorEventListenerProps<Remirror.Extensions>) => {
      let nextState = parameter.state;
      if (parameter.tr?.docChanged) {
        nextState = state.applyTransaction(parameter.tr).state;
        onChange(parameter.state.doc.textContent);
      }
      setState(nextState);
    },
    [onChange, setState, state]
  );

  return (
    <div>
      <Remirror manager={manager} state={state} onChange={handleSetState} autoRender={true} />
    </div>
  );
};
