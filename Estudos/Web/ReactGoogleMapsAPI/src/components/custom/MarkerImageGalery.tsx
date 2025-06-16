interface props {
  clicked: boolean;
}

export function MarkerImageGalery(props: props) {
  return (
    <>
      {props.clicked ? (
        <div className="w-5 h-5 bg-white rounded-full"></div>
      ) : (
        <div className="justify-center items-center">
          <img
            className="scale-[0.3]"
            src="https://static.vecteezy.com/ti/fotos-gratis/t2/26585800-lindo-moderno-casa-exterior-com-carport-moderno-residencial-distrito-e-minimalista-construcao-conceito-de-ai-gerado-gratis-foto.jpg"
            alt=""
          />
        </div>
      )}
    </>
  );
}
