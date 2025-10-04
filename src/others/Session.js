

export async function getSession() {
    const setUser = useUserStore((state) => state.setUser);

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        const userId = session.user.id;
        const { data: userData, error } = await supabase.from('users')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) {
            console.log(error.message)
        }else{
            setUser(userData)
        }
    }

}
