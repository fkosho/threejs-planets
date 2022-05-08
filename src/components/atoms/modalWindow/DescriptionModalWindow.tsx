type Props = {
    onClick: () => void
}

export const DescriptionModalWindow = (props: Props) => {
    const { onClick } = props


    return (
        <div 
            className="discription_modal" 
            style={{
                width: '300px',
                height: '100px',
                backgroundColor: '#ffffff',
                opacity: '60%',
                borderRadius: '10px'
            }}
            onClick={onClick}
        />
    )
}